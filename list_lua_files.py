# file: list_lua_files.py

from pathlib import Path

def list_lua_files(directory: str, output_file: str = "lua_files.txt") -> None:
    dir_path = Path(directory)
    
    if not dir_path.is_dir():
        raise NotADirectoryError(f"Provided path is not a directory: {directory}")

    lua_files = sorted([str(file.name) for file in dir_path.glob("*.lua")])

    with open(output_file, "w", encoding="utf-8") as f:
        for file_name in lua_files:
            f.write(file_name + "\n")

    print(f"Found {len(lua_files)} .lua files. Saved to {output_file}.")


if __name__ == "__main__":
    list_lua_files(
        "C:\\Users\\Yeyian\\Documents\\GameGuruApps\\GameGuruMAX\\Files\\scriptbank\\Community\\6704278\\core\\objects",
        "C:\\Users\\Yeyian\\Documents\\GameGuruApps\\GameGuruMAX\\Files\\scriptbank\\Community\\6704278\\core\\lua_files.txt"
    )
