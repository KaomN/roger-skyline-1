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
	address 'your ip address'
	netmask 'your netmask'
	gateway 'your gateway'
	broadcast 'your broadcast'