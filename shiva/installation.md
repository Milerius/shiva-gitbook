# Installation

## Prerequisite:

* CMake 3.9 \(minimum\)
* VCPKG \(optional\)
* Scripting \(lua and python 3.6 minimum\)
* C++17 Compiler MSVC/Clang/GCC \(mingw/cygwin/xcode are not supported\)

If you want to install shiva you have two possibilities:

* Using shiva as a submodule
* Using **vcpkg**

### Vcpkg:

#### Windows:

```text
$ ./vcpkg.exe install shiva:x64-Windows
```

**Windows \(plugins\):**

```text
$ ./vcpkg.exe install shiva-(plugins_name):x64-Windows

##! example
$ ./vcpkg.exe install shiva-sfml:x64-Windows
```

{% hint style="warning" %}
Currently on **Windows**, only the shared build is supported by shiva
{% endhint %}

#### Linux/OSX:

```text
$ ./vcpkg install shiva
```

**Linux/OSX \(plugins\):**

```text
$ ./vcpkg.exe install shiva-(plugins_name)

##! example
$ ./vcpkg.exe install shiva-sfml
```

{% hint style="info" %}
On **Linux** and **OSX** some extra commands are needed to install lua modules and sfml.
{% endhint %}

**Linux/OSX** **\(extras\):**

```bash
##! Linux
sudo apt-get install luarocks
luarocks install luafilesystem
sudo apt-get install libsfml2.5-dev (or manually install sfml 2.5.0)

##! OSX
brew install luarocks
brew install sfml
luarocks install luafilesystem
```

{% hint style="info" %}
To install vcpkg follow the instructions on the following github:  
[https://github.com/Microsoft/vcpkg](https://github.com/Microsoft/vcpkg)
{% endhint %}

### Submodules:

`git submodule add` [`https://github.com/milerius/shiva`](https://github.com/milerius/shiva)

