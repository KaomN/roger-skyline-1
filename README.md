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
[Linux Config static IP](https://linuxconfig.org/how-to-setup-a-static-ip-address-on-debian-linux)

### Subnet Mask Configuration  

Subnetting is the strategy used to partition a single physical network into more than one smaller logical sub-networks (subnets).

Links:  
[Subnetting Definition](https://www.techopedia.com/definition/28328/subnetting)  
[IBM CIDR Chart](https://www.ibm.com/docs/en/networkmanager/4.2.0?topic=tables-cidrinfo)  
[Subnet calculator](https://www.calculator.net/ip-subnet-calculator.html)

## SSH Configuration  

### SSH setup  
Install ssh server:  
>sudo apt-get install openssh-server  

#### Modify sshd_config file in /etc/ssh  

Change SSH port:  
>Port 50113  

Disable root login:  
>PermitRootLogin no  

Enable Public key Authentication:  
>PubKeyAuthentication yes  

Disable Password Authentication  
>PasswordAuthentication no  

#### Connecting with SSH  

Create new ssh key with:  
>ssh-keygen  

Copy contents of the public key to /home/user/.ssh/authorized_keys  
You can use:  
>ssh-copy-id -i "public key file path" "user@host"  
Note this will not work if Password authentication is disabled and there is no public key in the authorized_keys file. You can re-enable password authentication just for this or manually add it to the authorized_keys file

Connect using:
> ssh -p 50113 user@10.12.179.250  

Links:  
[ssh.com](https://www.ssh.com/academy/ssh/)  
[Enable ssh in Debian](https://phoenixnap.com/kb/how-to-enable-ssh-on-debian)