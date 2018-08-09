# shiva::error

## Purpose

This module is a centralized error handler, which handle the **fatal errors** that can happen in shiva, and uses **boost::stacktrace** to store information about a fatal error or crash.

{% hint style="info" %}
The file of the last crash can be found here:`std::filesystem::temp_directory_path() /= "backtrace.dump"`
{% endhint %}

