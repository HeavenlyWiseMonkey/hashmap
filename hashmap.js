import {Node, LinkedList} from './linked-list.js';

class HashMap {
    constructor(capacity=16) {
        this.capacity = capacity;
        this.map = [];
        this.loadFactor = 0.75;
        this.length = 0;
    }
    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode % this.capacity;
    }
    set(key, value) {
        const hashCode = this.hash(key);
        // check if bucket exists before making a bucket
        if (!this.map[hashCode]) {
            this.map[hashCode] = new LinkedList(new Node([key, value]));
        }
        // find the key in the bucket to overwrite or add if unique key
        else {
            let bucket = this.map[hashCode];
            let point = bucket.head;
            while (point) {
                if (point[0] === key) {
                    point[1] = value;
                    return;
                }
                point = point.next;
            }
            bucket.append([key, value]);
        }
        this.grow();
        this.length++;
    }
    get(key) {
        const hashCode = this.hash(key);
        let bucket = this.map[hashCode];
        let point = (bucket) ? bucket.head: null;
        while (point) {
            if (point.data[0] === key) {
                return point.data[1];
            }
            point = point.next;
        }
        return null;
    }
    has(key) {
        const hashCode = this.hash(key);
        let bucket = this.map[hashCode];
        let point = (bucket) ? bucket.head : null;
        while (point) {
            if (point.data[0] === key) {
                return true;
            }
            point = point.next;
        }
        return false;
    }
    remove(key) {
        const hashCode = this.hash(key);
        let bucket = this.map[hashCode];
        let point = (bucket) ? bucket.head: null;
        let index = 0;
        const pair = [key, this.get(key)];
        while (point) {
            if (pair[0] === point.data[0] && pair[1] === point.data[1]) {
                if (bucket.head[0] === bucket.tail[0]) {
                    this.map[hashCode] = undefined;
                }
                else {
                    bucket.removeAt(index);
                }
                return true;
            }
            index += 1;
            point = point.next;
        }
        return false;
    }
    clear() {
        this.map = [];
        this.length = 0;
        this.capacity = 16;
    }
    keys() {
        let keyArray = [];
        let bucket;
        let point;
        let key;
        for (let i=0; i<this.map.length; i++) {
            bucket = this.map[i];
            point = (bucket) ? bucket.head: null;
            while (point) {
                key = point.data[0];
                keyArray.push(key);
                point = point.next;
            }
        }
        return keyArray;
    }
    values() {
        let valueArray = [];
        let bucket;
        let point;
        let value;
        for (let i=0; i<this.map.length; i++) {
            bucket = this.map[i];
            point = (bucket) ? bucket.head: null;
            while (point) {
                value = point.data[1];
                valueArray.push(value);
                point = point.next;
            }
        }
        return valueArray;
    }
    entries() {
        let entryArray = [];
        let bucket;
        let point;
        for (let i=0; i<this.map.length; i++) {
            bucket = this.map[i];
            point = (bucket) ? bucket.head: null;
            while (point) {
                entryArray.push(point.data);
                point = point.next;
            }
        }
        return entryArray;
    }
    grow() {
        let newArray = [];
        let bucket;
        let point;
        let hashCode;
        let key;
        let value;
        let newArrayBucket;
        if (this.length >= this.capacity * this.loadFactor) {
            this.capacity *= 2;
            for (let i=0; i<this.map.length; i++) {
                bucket = this.map[i];
                point = (bucket) ? bucket.head: null;
                while (point) {
                    key = point.data[0];
                    value = point.data[1];
                    hashCode = this.hash(key);
                    if (!newArray[hashCode]) {
                        newArray[hashCode] = new LinkedList(new Node([key, value]));
                    }
                    else {
                        newArrayBucket = newArray[hashCode];
                        newArrayBucket.append([key, value]);
                    }
                    point = point.next;
                }
            }
            this.map = newArray;
        }
    }
}

class HashSet {
    constructor(capacity=16) {
        this.capacity = capacity;
        this.array = [];
        this.loadFactor = 0.75;
        this.length = 0;
    }
    hash(key) {
        let hashCode = 0;
        
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
     
        return hashCode % this.capacity;
    }
    set(key) {
        const hashCode = this.hash(key);
        // check if bucket exists before making a bucket
        if (!this.array[hashCode]) {
            this.array[hashCode] = new LinkedList(new Node(key));
        }
        // find the key in the bucket to overwrite or add if unique key
        else {
            let bucket = this.array[hashCode];
            let point = bucket.head;
            while (point) {
                if (point === key) {
                    return;
                }
                point = point.next;
            }
            bucket.append(key);
        }
        this.grow();
        this.length++;
    }
    has(key) {
        const hashCode = this.hash(key);
        let bucket = this.array[hashCode];
        let point = (bucket) ? bucket.head : null;
        while (point) {
            if (point.data === key) {
                return true;
            }
            point = point.next;
        }
        return false;
    }
    remove(key) {
        const hashCode = this.hash(key);
        let bucket = this.array[hashCode];
        let point = bucket.head;
        let index = 0;
        while (point) {
            if (point.data === key) {
                if (bucket.head === bucket.tail) {
                    this.array[hashCode] = undefined;
                }
                else {
                    bucket.removeAt(index);
                }
                return true;
            }
            index += 1;
            point = point.next;
        }
        return false;
    }
    clear() {
        this.array = [];
        this.length = 0;
        this.capacity = 16;
    }
    keys() {
        let keyArray = [];
        let bucket;
        let point;
        let key;
        for (let i=0; i<this.array.length; i++) {
            bucket = this.array[i];
            point = (bucket) ? bucket.head: null;
            while (point) {
                key = point.data;
                keyArray.push(key);
                point = point.next;
            }
        }
        return keyArray;
    }
    grow() {
        let newArray = [];
        let bucket;
        let point;
        let hashCode;
        let key;
        let newArrayBucket;
        if (this.length >= this.capacity * this.loadFactor) {
            this.capacity *= 2;
            for (let i=0; i<this.array.length; i++) {
                bucket = this.array[i];
                point = (bucket) ? bucket.head: null;
                while (point) {
                    key = point.data;
                    hashCode = this.hash(key);
                    if (!newArray[hashCode]) {
                        newArray[hashCode] = new LinkedList(new Node(key));
                    }
                    else {
                        newArrayBucket = newArray[hashCode];
                        newArrayBucket.append(key);
                    }
                    point = point.next;
                }
            }
            this.array = newArray;
        }
    }
}

export {HashMap, HashSet};