"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CacheItem = exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class ArrayAdapter {
  constructor(defaultLifetime = 0) {
    _defineProperty(this, "createCacheItem", (key, value, isHit) => {
      let item = new CacheItem();
      item.key = key;
      item.value = value;
      item.isHit = isHit;
      item.defaultLifetime = this.defaultLifetime;
      return item;
    });

    _defineProperty(this, "get", (key, callback, beta = null, metadata = null) => {
      let item = this.getItem(key);

      if (!item.isHit) {
        let save = true;
        this.save(item.set(callback(item, save)));
      }

      return item.get();
    });

    _defineProperty(this, "getItem", key => {
      let isHit = this.hasItem(key),
          value = null;

      if (!isHit) {
        this.values[key] = null;
      } else {
        value = this.values[key];
      }

      let f = this.createCacheItem;
      return f(key, value, isHit);
    });

    _defineProperty(this, "getItems", keys => {
      for (let key of keys) {
        if (typeof key !== "string" && !this.expiries[key]) {
          CacheItem.validateKey(key);
        }
      }

      return this.generateItems(keys, new Date().getTime() / 1000, this.createCacheItem);
    });

    _defineProperty(this, "deleteItems", keys => {
      for (let key of keys) {
        this.deleteItem(key);
      }

      return true;
    });

    _defineProperty(this, "save", item => {
      if (!item instanceof CacheItem) {
        return false;
      }

      if (item.expiry !== null && item.expiry <= new Date().getTime() / 1000) {
        this.deleteItem(item.key);
        return true;
      }

      if (null === item.expiry && 0 < item.defaultLifetime) {
        item.expiry = new Date().getTime() / 1000 + item.defaultLifetime;
      }

      this.values[item.key] = item.value;
      this.expiries[item.key] = item.expiry || Number.MAX_SAFE_INTEGER;
      return true;
    });

    _defineProperty(this, "saveDeferred", item => {
      return this.save(item);
    });

    _defineProperty(this, "commit", () => {
      return true;
    });

    _defineProperty(this, "delete", key => {
      return this.deleteItem(key);
    });

    _defineProperty(this, "getValues", () => {
      return this.values;
    });

    _defineProperty(this, "hasItem", key => {
      if (typeof key === "string" && this.expiries[key] && this.expiries[key] > new Date().getTime() / 1000) {
        return true;
      }

      CacheItem.validateKey(key);
      return !!this.expiries[key] && !this.deleteItem(key);
    });

    _defineProperty(this, "clear", () => {
      this.values = {};
      this.expiries = {};
      return true;
    });

    _defineProperty(this, "deleteItem", key => {
      if (typeof key !== "string" || !this.expiries[key]) {
        CacheItem.validateKey(key);
      }

      delete this.values[key];
      delete this.expiries[key];
      return true;
    });

    _defineProperty(this, "reset", () => {
      this.clear();
    });

    _defineProperty(this, "generateItems", (keys, now, f) => {
      let generated = [];

      for (let key of keys) {
        let value = null;
        let isHit = !!this.expiries[key];

        if (!isHit && (this.expiries[key] > now || !this.deleteItem(key))) {
          this.values[key] = null;
        } else {
          value = this.values[key];
        }

        generated[key] = f(key, value, isHit);
      }

      return generated;
    });

    this.defaultLifetime = defaultLifetime;
    this.values = {};
    this.expiries = {};
  }

}

exports.default = ArrayAdapter;

class CacheItem {
  constructor() {
    _defineProperty(this, "getKey", () => {
      return this.key;
    });

    _defineProperty(this, "get", () => {
      return this.value;
    });

    _defineProperty(this, "set", value => {
      this.value = value;
      return this;
    });

    _defineProperty(this, "expiresAt", expiration => {
      if (null === expiration) {
        this.expiry = this.defaultLifetime > 0 ? Date.now() / 1000 + this.defaultLifetime : null;
      } else if (expiration instanceof Date) {
        this.expiry = expiration.getTime() / 1000;
      } else {
        throw new Error(`Expiration date must be instance of Date or be null, "${expiration.name}" given`);
      }

      return this;
    });

    _defineProperty(this, "expiresAfter", time => {
      if (null === time) {
        this.expiry = this.defaultLifetime > 0 ? Date.now() / 1000 + this.defaultLifetime : null;
      } else if (Number.isInteger(time)) {
        this.expiry = new Date().getTime() / 1000 + time;
      } else {
        throw new Error(`Expiration date must be an integer or be null, "${time.name}" given`);
      }

      return this;
    });

    _defineProperty(this, "tag", tags => {
      if (!this.isTaggable) {
        throw new Error(`Cache item "${this.key}" comes from a non tag-aware pool: you cannot tag it.`);
      }

      if (!Array.isArray(tags)) {
        tags = [tags];
      }

      for (let tag of tags) {
        if (typeof tag !== "string") {
          throw new Error(`Cache tag must by a string, "${typeof tag}" given.`);
        }

        if (this.newMetadata.tags[tag]) {
          if (tag === '') {
            throw new Error("Cache tag length must be greater than zero");
          }
        }

        this.newMetadata.tags[tag] = tag;
      }

      return this;
    });

    _defineProperty(this, "getMetadata", () => {
      return this.metadata;
    });

    this.key = null;
    this.value = null;
    this.isHit = false;
    this.expiry = null;
    this.defaultLifetime = null;
    this.metadata = {};
    this.newMetadata = {};
    this.innerItem = null;
    this.poolHash = null;
    this.isTaggable = false;
  }

}

exports.CacheItem = CacheItem;

_defineProperty(CacheItem, "METADATA_EXPIRY_OFFSET", 1527506807);

_defineProperty(CacheItem, "RESERVED_CHARACTERS", ["{", "}", "(", ")", "/", "\\", "@", ":"]);

_defineProperty(CacheItem, "validateKey", key => {
  if (typeof key !== "string") {
    throw new Error(`Cache key must be string, "${typeof key}" given.`);
  }

  if ('' === key) {
    throw new Error("Cache key length must be greater than zero");
  }

  for (let reserved of CacheItem.RESERVED_CHARACTERS) {
    if (key.indexOf(reserved) >= 0) {
      throw new Error(`Cache key "${key}" contains reserved character "${reserved}".`);
    }
  }

  return key;
});