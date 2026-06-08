# Day 1 - System Reverse Engineering Report

## Step 1 : System Inspection(Windows)
-OS Version : 10.0.26200 N/A Build 26200
  command used : systeminfo
  ![screenshot](screenshots/os-version.png)

-Current Shell : Powershell
  observed prompt 
  ![screenshot](screenshots/shell.png)

-Node Binary Path:** C:\Program Files\nodejs\node.exe  
  Command used: where.exe node
  ![screenshot](screenshots/node.png)

-NPM Global Path:** C:\Users\adity\AppData\Roaming\npm\node_modules
  Command used: npm root -g
  ![screenshot](screenshots/node.png)

-PATH Entries with node/npm:**  
  C:\Windows\System32
  C:\Windows
  C:\Windows\System32\Wbem
  C:\Program Files\nodejs" /M
  PS C:\Users\adity> 
  Command used: $env:Path -split ';'  
  ![screenshot](screenshots/node.png)


## Step 2 : NVM Installation and Versions Management 
-Installed NVM 
  command used : nvm version
  ![screenshot](screenshots/nvm.png)

-Installed Node Versions 
  command used : nvm list
  ![screenshot](screenshots/nvm.png)

-Versions Switching Test 
  command used : nvm use <version>
  ![screenshot](screenshots/nvm.png)

-Verified active version using
  command used : node -v 
  ![screenshot](screenshots/nvm.png)


## Step 3 : System Introspection Script
Created a Node.js script named `introspect.js` to collect runtime and operating system information.
### Information Collected
- Operating System
- System Architecture
- CPU Core Count
- Total Memory
- System Uptime
- Current Logged User
- Active Node.js Executable Path

### Command Used
node introspect.js
![screenshot](screenshots/introspect.png)


## Step 4 : Stream vs Buffer Analysis

### Buffer (fs.readFile)
- Loads complete file into memory.
- Faster for small files.
- High memory consumption for large files.
![screenshot](screenshots/BufferTest.png)

### Stream (fs.createReadStream)
- Reads file in chunks.
- Lower memory usage.
- Better for large files.
![screenshot](screenshots/StreamTest.png)

### Conclusion
For large files, streams are more memory efficient and scalable than buffers.
![screenshot](screenshots/generateFile.png)