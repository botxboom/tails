import csv
import random
import string

def random_string(length):
    return ''.join(random.choice(string.ascii_letters) for _ in range(length))

def random_number():
    return random.randint(1, 1000)

def generate_large_csv(file_name, num_rows):
    with open(file_name, mode='w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['Column1', 'Column2', 'Column3'])
        
        for i in range(num_rows):
            row = [i, random_string(50), random_string(50)]
            writer.writerow(row)

generate_large_csv('large_file.csv', 100000000)
