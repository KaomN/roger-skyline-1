# Roger Skyline 1 Project

## Network Configuration

### Changing network from dhcp to static  
Modify interaces file in /etc/network.  
Remove:  
>iface 'devicename' inet dhcp

Add:
>auto 'devicename'

Create new file named 'devicename' in /etc/network/interfaces.d  

Add:
>iface 'devicename' inet static  
&ensp;&ensp;&ensp;&ensp;address 'your ip address'  
&ensp;&ensp;&ensp;&ensp;netmask 'your netmask'  
&ensp;&ensp;&ensp;&ensp;gateway 'your gateway'  
&ensp;&ensp;&ensp;&ensp;broadcast 'your broadcast'  

Restart networking service with:  
>sudo systemctl restart networking  

Links:  
[Wiki Debian](https://wiki.debian.org/NetworkConfiguration#Configuring_the_interface_manually)  
[Linux Config](https://linuxconfig.org/how-to-setup-a-static-ip-address-on-debian-linux)

## SSH Configuration  

### SSH setup  
Install ssh server:  
>sudo apt-get install openssh-server  

Modify sshd_config file in /etc/ssh  

Change SSH port:  
>Port 50113  

Disable root login:  
>PermitRootLogin no  