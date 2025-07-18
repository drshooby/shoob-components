import os

'''
Yes. I use python to write TSX, so what?
'''

comp_dir = input("What component dir to set up: ")
os.makedirs(os.path.join(os.getcwd() + "/components", comp_dir), exist_ok=False)

files_to_make = [comp_dir + ".tsx", comp_dir + ".module.css", "index.tsx"]

for filename in files_to_make:
  file = os.path.join(os.getcwd(), "components", comp_dir, filename)
  with open(file, "w") as f:
    if filename.startswith(comp_dir) and not filename.endswith(".css"):
      f.write(f"import styles from \"./{comp_dir}.module.css\"\n\nexport function {comp_dir}() {{return <></>}}")

    if filename == "index.tsx":
      f.write(f"export {{ {comp_dir} }} from \"./{comp_dir}\"")