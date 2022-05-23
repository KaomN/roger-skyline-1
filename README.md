# Roger Skyline 1 Project

## Network Configuration

Changing network from dhcp to static.  
Modify interaces file in /etc/network.  
Remove  
> iface 'devicename' inet dhcp

Add
> auto 'devicename'

Create new file named 'devicename' in /etc/network/interfaces.d  
Add
> iface 'devicename' inet static  
&nbsp;&nbsp;&nbsp;&nbsp;address 'your ip address'  
&nbsp;&nbsp;&nbsp;&nbsp;netmask 'your netmask'  
&nbsp;&nbsp;&nbsp;&nbsp;gateway 'your gateway'  
&nbsp;&nbsp;&nbsp;&nbsp;broadcast 'your broadcast'  