# Tails

## Description

How to write your own `tail` command using NodeJs

### Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/botxboom/tails.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd tails
   ```

3. **Additional setup** (if applicable):

   Generate large_file.csv using

   ```bash
   python generateCSV.py
   ```

4. **Run two approaches to test tail command**:

   ```bash
   node approach1.js
   ```

   ```bash
   node approach2.js large_file.csv 10 -f
   ```

   ```bash
   node approach3.js
   ```
