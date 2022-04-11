'use strict';
// let foo: ReadonlyArray<number> = [1, 2, 3];
const foo = [1, 2, 3];
console.log(foo[0]); // 오케이
// Object.freeze(foo);
Object.seal(foo);
delete foo[0];
console.log(foo[0]); // 오케이

// foo.push(4);           // 오류: `push`는 배열을 상태를 바꾸므로 ReadonlyArray에 존재하지 않음
// foo = foo.concat([4]); // 오케이: 복사본 생성
