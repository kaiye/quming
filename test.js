"use strict";
let assert = require("assert");
let SearchSong = require('./index');

describe('function test', function() {
    describe('SearchSong()', function() {
        this.timeout(10000);
        it('should return array which is not empty', function() {
            return SearchSong({
                text: '一',
                debug: {
                    num: 1,
                },
                noLastWord: true,
            })
            .then((res) => assert.notEqual(0, res.length, 'result is empty'))
            .fail((err) => {
                if( err.code === 'ETIMEDOUT' ){
                    console.log('ignore timeout error');
                }else{
                    assert.ifError(err); 
                }
            })
        });
    });
});
