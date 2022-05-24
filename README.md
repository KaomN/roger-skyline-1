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
```console
sudo systemctl restart networking  
```

Links:  
[Wiki Debian](https://wiki.debian.org/NetworkConfiguration#Configuring_the_interface_manually)  
[Linux Config static IP](https://linuxconfig.org/how-to-setup-a-static-ip-address-on-debian-linux)

### Subnet Mask Configuration  

Subnetting is the strategy used to partition a single physical network into more than one smaller logical sub-networks (subnets).

Links:  
[Subnetting Definition](https://www.techopedia.com/definition/28328/subnetting)  
[IBM CIDR Chart](https://www.ibm.com/docs/en/networkmanager/4.2.0?topic=tables-cidrinfo)  
[Subnet calculator](https://www.calculator.net/ip-subnet-calculator.html)

## Firewall/DOS/Port Scan Configuration  

### Firewall Setup  

Install ufw:
```console
sudo apt-get install ufw  
```
Deny all incoming connections:  
```console
sudo ufw default deny incoming  
```
Allow all outgoing connections:  
```console
sudo ufw default allow outgoing  
```
Allow SSH connection:  
```console
sudo ufw allow 50113/tcp  
```
Allow http connection:  
```console
sudo ufw allow 80/tcp  
```
Allow https connection:  
```console
sudo ufw allow 443  
```
Enable ufw:  
```console
sudo ufw enable  
```

Links:  
[ufw setup](https://www.how2shout.com/linux/install-and-configure-ufw-on-debian-11-or-10/)  

### DOS setup  

Install fail2ban:  
```console
sudo apt-get install fail2ban  
```

Create new config file in /etc/fail2ban/jail.d/"filename"  
Add:  
>[DEFAULT]  
bantime = 5m  
findtime = 5m  
maxretry = 5  

>[sshd]  
enabled = true  
maxretry = 3  
findtime = 5m  
bantime = 5m  
port = 50113  
logpath = %(sshd_log)s  
backend = %(sshd_backend)s  

>[http-dos]
enabled = true  
maxretry = 20  
findtime = 5m  
bantime = 5m  
port = http,https  
filter = http-dos  
logpath = /var/log/apache2/access.log  
action = iptables[name=HTTPS, port=https, protocol=tcp]  

Create new filter file in /etc/fail2ban/filter.d/http-dos  
Add:
>[Definition]
failregex = ^<HOST> -.*"(GET|POST).*  
ignoreregex =  

Check fail2ban logs with:  
```console
sudo tail -f /var/log/fail2ban.log  
```

Links:  
[fail2ban How it Works](https://www.digitalocean.com/community/tutorials/how-fail2ban-works-to-protect-services-on-a-linux-server)  
[fail2ban setup](https://www.garron.me/en/go2linux/fail2ban-protect-web-server-http-dos-attack.html)  

### Port Scan Setup  

Install portsentry with:  
```console
sudo apt-get install portsentry  
```

Modify /etc/default/portsentry  
>TCP_MODE="atcp"  
UDP_MODE="audp"  

Modify /etc/portsentry/portsentry.conf  
>BLOCK_TCP="1"  
BLOCK_UDP="1"  

Uncomment line:  
><div>  
>KILL_ROUTE="/sbin/iptables -I INPUT -s $TARGET$ -j DROP"  
></div>  

Comment line:  
><div>  
>KILL_ROUTE="/sbin/route add -host $TARGET$ reject"  
></div>  

Links:  
[Portsentry setup](https://en-wiki.ikoula.com/en/To_protect_against_the_scan_of_ports_with_portsentry)  

## SSH Configuration  

### SSH setup  
Install ssh server:  
```console
sudo apt-get install openssh-server  
```
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
```console
ssh-keygen  
```
Copy contents of the public key to /home/user/.ssh/authorized_keys  
You can use:  
```console
ssh-copy-id -i "public key file path" "user@host"  
```
>Note this will not work if Password authentication is disabled and there is no public key in the authorized_keys file. You can re-enable password authentication just for this or manually add it to the authorized_keys file

Connect using:
```console
ssh -p 50113 user@10.12.179.250  
```

Links:  
[ssh.com](https://www.ssh.com/academy/ssh/)  
[Enable ssh in Debian](https://phoenixnap.com/kb/how-to-enable-ssh-on-debian)

## Disable services  

## Scripts  

### Update script  

Create new file named update.sh  
Add:
>#!/bin/bash  
>sudo apt-get update -y >> /var/log/update_script.log  
>sudo apt-get upgrade -y >> /var/log/update_script.log  

Give it the right permissions with:  
```console
sudo chmod 755 update.sh  
```

Save/move the file to:  
>/usr/local/sbin/  

Add the new script to crontab:  
```console
sudo crontab -e  
```

Add:  
>0 4 * * 0 sudo /usr/local/sbin/update.sh  
>@reboot sudo /usr/local/sbin/update.sh  

### Monitor crontab changes script  

## Webserver setup  

### Apache installation  

Install apache2:  
```console
sudo apt-get install apache2  
```

Check that apache is running:  
```console
sudo systemctl status apache2  
```

Check that apache works:  
>Open browser and type in http://YOUR_IP/  

Change index.html file in /var/www/html to your index.html file.  

Useful command to copy from host to server:  
>scp -P 50113 file.txt username@to_host:/remote/directory/  

Links:  
[How to install Apache](https://linuxize.com/post/how-to-install-apache-on-debian-10/)  

### SSL Certificate  

#### Create the SSL certificate:  
```console
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/apache-selfsigned.key -out /etc/ssl/certs/apache-selfsigned.crt  
```

After running the command it will a few questions:  
>Country Name (2 letter code) [AU]: FI  
>State or Province Name (full name) [Some-State]: Helsinki  
>Locality Name (eg, city) []: Helsinki  
>Organization Name (eg, company) [Internet Widgits Pty Ltd]: Hive  
>Organizational Unit Name (eg, section) []: Student  
>Common Name (e.g. server FQDN or YOUR name) []: server_IP_address  
>Email Address []: your_email_address  

#### Configuring Apache to Use SSL

Create new file:  
```console
sudo vim /etc/apache2/conf-available/ssl-params.conf  
```

Add the following to the file:  
>SSLCipherSuite EECDH+AESGCM:EDH+AESGCM:AES256+EECDH:AES256+EDH  
>SSLProtocol All -SSLv2 -SSLv3 -TLSv1 -TLSv1.1  
>SSLHonorCipherOrder On  
>Header always set X-Frame-Options DENY  
>Header always set X-Content-Type-Options nosniff  
>SSLCompression off  
>SSLUseStapling on  
>SSLStaplingCache "shmcb:logs/stapling-cache(150000)"  
>SSLSessionTickets Off  

#### Modifying the Default Apache SSL Virtual Host File  

Back up the original SSL Virtual Host file:  
```console
sudo cp /etc/apache2/sites-available/default-ssl.conf /etc/apache2/sites-available/default-ssl.conf.bak  
```

Open the SSL Virtual Host file to make adjustments:  
```console
sudo vim /etc/apache2/sites-available/default-ssl.conf  
```

Change/Add:  
><div>  
>ServerAdmin your_email@example.com  
></div>  
>ServerName server_domain_or_IP  

>SSLCertificateFile /etc/ssl/certs/apache-selfsigned.crt  
>SSLCertificateKeyFile /etc/ssl/private/apache-selfsigned.key  

#### Redirect to HTTP to HTTPS  

Modify Virtual Host file:  
```console
sudo vim /etc/apache2/sites-available/000-default.conf  
```

Add:  
>Redirect permanent "/" "https://your_domain_or_IP/"  

#### Enabling the Changes in Apache  

Enable mod_ssl, the Apache SSL module, and mod_headers, which is needed by some of the settings in our SSL snippet, with the a2enmod command:  
```console
sudo a2enmod ssl  
```
```console
sudo a2enmod headers  
```

Enable SSL Virtual Host with the a2ensite command:  
```console
sudo a2ensite default-ssl  
```

Enable ssl-params.conf file:  
```console
sudo a2enconf ssl-params  
```

Check that there are no syntax errors in our files:  
```console
sudo apache2ctl configtest  
```

Restart apache:  
```console
sudo systemctl restart apache2  
```

Links:  
[SSL Certificate for Apache](https://www.digitalocean.com/community/tutorials/how-to-create-a-self-signed-ssl-certificate-for-apache-in-debian-10)  