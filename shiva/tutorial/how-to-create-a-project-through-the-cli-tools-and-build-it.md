# How to create a project through the CLI tools and build it

## Using the CLI

### Prerequisites

* You should install shiva with **vcpkg** or with a regular installation before following this tutorial.
* **VCPKG\_ROOT** env variable set to the root directory of your installation of VCPKG
* **Python 3.6**

## Create a project and build it

### If you use VCPKG:

#### Windows

Open powershell and type: 

```bash
cd "$($env:VCPKG_ROOT)/installed/x64-Windows/share/shiva/tools"
##! syntax
./cli_shiva.py --project_name project_name --project_renderer renderer_name --output_directory path
##! for example
./cli_shiva.py --project_name bomberman --project_renderer sfml --output_directory D:/game_project/bomberman

cd D:/game_project/bomberman
mkdir build
cd build
##! Replace Release by Debug if you prefer Debug
cmake -G "Visual Studio 15 2017 Win64" -DCMAKE_TOOLCHAIN_FILE="$($env:VCPKG_ROOT)/scripts/buildsystems/vcpkg.cmake" -DCMAKE_BUILD_TYPE=Release ..
cmake --build . --config Release
```

**Linux or OSX**

```bash
##! Linux
cd $VCPKG_ROOT/installed/x64-linux/share/shiva/tools

##! OSX
cd $VCPKG_ROOT/installed/x64-osx/share/shiva/tools

##! syntax
./cli_shiva.py --project_name project_name --project_renderer renderer_name --output_directory path
##! for example
./cli_shiva.py --project_name bomberman --project_renderer sfml --output_directory ~/Documents/bomberman

cd ~/Documents/bomberman
mkdir build
cd build

##! Linux (Replace Release by Debug if you need)
cmake -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/vcpkg/scripts/buildsystems/vcpkg.cmake -DCMAKE_BUILD_TYPE="Release" -DCMAKE_CXX_COMPILER=g++-8 -DCMAKE_C_COMPILER=gcc-8 ..

##! OSX (Replace Release by Debug if you need)
cmake -DCMAKE_TOOLCHAIN_FILE=$VCPKG_ROOT/vcpkg/scripts/buildsystems/vcpkg.cmake -DCMAKE_BUILD_TYPE="Release" -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_C_COMPILER=clang ..

make
```

