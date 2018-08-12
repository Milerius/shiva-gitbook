# shiva::spdlog

## Purpose

This module simply makes a **namespace alias on** [Boost.Stacktrace](https://github.com/boostorg/stacktrace). This module is represented by a cmake interface library that facilitates its handling through other modules.

```cpp
#include <spdlog/spdlog.h>
#include <spdlog/sinks/stdout_color_sinks.h>

namespace shiva
{
    namespace log = spdlog;
}

namespace shiva::logging
{
    using logger = std::shared_ptr<shiva::log::logger>;
}
```

