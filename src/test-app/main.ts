import { ValueId } from "../lib/carbotaniuman-nt4/message/binary";
import { SettableValue } from "../lib/carbotaniuman-nt4/nt/client";
import { NT4Client } from "../index";
import { Entry } from "../lib/carbotaniuman-nt4/nt/entry";

// Set url to standard + /nt/clientId
const ntClient = new NT4Client('ws://localhost:5810/nt/Romi');

// Create new value to publish
let entry_pub = new Entry(ntClient,'Romi/myvalue');
entry_pub.publish(ValueId.Integer);

// Publish myvalue to Romi section as an increasing counter
let value = 0;
setInterval(() => {
    console.log('value = ' + value);
    entry_pub.setInteger(value);
    value++;
}, 1000);


