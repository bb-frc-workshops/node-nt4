import { ValueId } from "../lib/carbotaniuman-nt4/message/binary";
import { NT4Client } from "../index";
import { Entry } from "../lib/carbotaniuman-nt4/nt/entry";
import { TimestamepdValue, EntryListener } from "../lib/carbotaniuman-nt4/nt/client";

// Set url to standard + /nt/clientId
const ntClient = new NT4Client('ws://localhost:5810/nt/Romi');


// Create new value to publish to Romi section, field SecondsSinceStart
let entry_pub = new Entry(ntClient,'Romi/SecondsSinceStart');

// Publish SecondsSinceStart as an increasing counter at 1 second interval
let value = 0;
setInterval(() => {
    if( entry_pub.setInteger(value) ) {
        console.log('publish value = ' + value);
        value++;
    } else {
        value = 0;  // Reset value since not connected
        console.log('Failed to publish integer, retrying connection');
        ntClient.retry(); // Retry connection
    }
}, 1000);

// Specify the table you'd like to listen to
let entry_sub = new Entry(ntClient, '/FMSInfo');

// Create listener for MatchNumber
let matchNumber_callback = ((newValue: TimestamepdValue, oldValue: TimestamepdValue | undefined, path: string) => {
    console.log("MatchNumber old: " + oldValue?.value.value + " new: " + newValue.value.value);
}) as EntryListener;

// Keep tryihng to subscribe (need to do this after the connection succeeds)
// TODO: save subscriptions so that they are added after connection
setInterval( () => {
    if (ntClient.connected && !entry_sub.subscribed()) {
        let subscribed = entry_sub.subscribe();
        ntClient.addListener('/FMSInfo/MatchNumber', 'MatchNumber', matchNumber_callback);
    }
}, 1000);
