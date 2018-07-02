# shiva::filesystem

This module simply makes a **namespace alias** and some preprocessing mandatory to use std::filesystem. This module is represented by a cmake interface library that facilitates its handling through other modules.

{% code-tabs %}
{% code-tabs-item title="filesystem.hpp" %}
```cpp
#if __has_include(<experimental/filesystem>)
    #include <experimental/filesystem>
    namespace shiva
    {
        namespace fs = std::experimental::filesystem;
    }
#elif __has_include(<filesystem>)
    #include <filesystem>
    namespace shiva
    {
      namespace fs = std::filesystem;
    }
#endif
```
{% endcode-tabs-item %}
{% endcode-tabs %}

To manage it from side of cmake you have to do as follow:

```cmake
if (LINUX)
    target_link_libraries(filesystem INTERFACE stdc++fs)
endif(LINUX)

if(APPLE)
    target_link_libraries(filesystem INTERFACE c++experimental)
endif(APPLE)
```

