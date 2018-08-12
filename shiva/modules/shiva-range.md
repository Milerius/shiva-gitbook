# shiva::range

## Purpose

This module simply makes a **namespace alias on** [nanorange](https://github.com/tcbrindle/NanoRange). This module is represented by a cmake interface library that facilitates its handling through other modules.

```cpp
#include <shiva/range/nanorange.hpp>

namespace shiva
{
    namespace ranges = ::nano::ranges;
}
```

