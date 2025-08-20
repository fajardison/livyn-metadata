# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.0.0] - 2025-08-20
### Added
- Initial release of `@livyn/metadata`
- `MetaStore` class for defining and managing metadata
- `CacheStore` class for caching metadata
- Support for TTL (time-to-live) per key
- Freeze option to prevent object modification
- Overwrite control for metadata keys
- Merge support for combining metadata objects
- Runtime queries: `findByKey`, `findByValue`
- Debug methods to inspect metadata
- ASCII and banner display for metadata
- Full API documentation

### Changed
- N/A

### Fixed
- N/A

---

## Future Plans
- Add support for nested TTL expiration
- Implement event hooks for metadata changes
- Extend cache options (LRU, LFU)
- Support for asynchronous metadata values
