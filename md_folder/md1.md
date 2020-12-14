# Javascript 학습노트
### ES6
  - #### Spread syntax (전개 구문) < ... obj >
    ```js
    let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
    x; // 1
    y; // 2
    z; // { a: 3, b: 4 }
    ```
    ```js
    let n = { x, y, ...z };
    n; // { x: 1, y: 2, a: 3, b: 4 }
    ```

***
### DOM Element
- #### NodeList 객체를 배열 타입으로 이용하기
    - `Array.from()`을 통해 사용 가능.
    
    * Code / [참고자료](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/from "MDN Array.from 바로가기")
      ```js
      let nodelist = document.querySelector('selector');
      //forEach 사용을 위해 
      Array.from(nodelist).forEach((node) => console.log(node));
      ```
- #### DOMTokenList
  - code / [참고자료](https://developer.mozilla.org/ko/docs/Web/API/DOMTokenList "MDN 바로가기")
    ```js 
    let classes = element.classList; // classList를 통해 DOMTokenList에 접근할 수 있다.
    ``` 
  - add(), remove(), toggle() 등 여러가지 Method를 제공한다.
- #### Node
  - ##### Node.insertbefore()
    ```js
    let insertedNode = parentNode.insertBefore(newNode, referenceNode);
    ``` 
  - 부모노드의 참조노드 이전에 새 노드를 삽입한다.
  - referenceNode 값으로 null을 전달할 경우 리스트의 마지막으로 삽입하게 된다. )
***
### Web API
- #### blob
  - Blob(Binary Large Object, 블랍)은 이미지, 사운드, 비디오와 같은 멀티미디어 데이터를 다룰 때 사용할 수 있다.
  - 데이터의 크기(Byte) 및 MIME 타입을 알아내거나, 데이터를 송수신을 위한 작은 Blob 객체로 나누는 등의 작업에 사용
  - 참고자료 : [MDN](https://developer.mozilla.org/ko/docs/Web/API/Blob "MDN 바로가기") / [블로그](https://heropy.blog/2019/02/28/blob/ "블로그 바로가기")
- #### XMLSerializer 인터페이스
  - XMLSerializer() 객체 생성 후 serializeToString()를 통해 document를 문자열로 나타낼 수 있다.
  - code
    ```js
    var s = new XMLSerializer();
    var d = document;
    var str = s.serializeToString(d);
    saveXML(str);
    ```

***
### 함수 및 기타 현상
- #### Byte 단위 변환 함수 
    * Code / [참고자료](https://qastack.kr/programming/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript)
      ```js
      sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      let i = Math.floor(Math.log(bytes) / Math.log(1024));
      return (bytes / 1024 ** i).toFixed(0) + ' ' + sizes[i];
      ```
    * 학습 내용
      - 로그함수를 사용하여 1024의 i승을 구한다.
      - sizes배열의 i번째 단위를 사용하여 데이터 표시
      - toFixed()를 사용하여 소수자리 설정

- #### Javascript 소수점 값 더하기 이상현상
  * 학습내용 / [참고자료](https://zorba91.tistory.com/266)
    - 0.1 + 0.2 = 0.30000000000000004 / 0.1 + 0.7 = 0.7999999999999999으로 출력되는 현상 
    - Math.round() 또는 toFixed()를 사용하여 방지할 수 있다. 소수점 12번째 자리에서 반올림 시 안정적인 사용 가능 
- #### Array.sort([compareFunction])
  - 내용  / [참고자료](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort "MDN 바로가기")
    > compareFunction(a,b)의 리턴 값이 0보다 작은 경우 a가 b보다 낮은 인덱스를 부여받는다.    
    > compareFunction(a,b)의 리턴 값이 0보다 큰 경우 a가 b보다 높은 인덱스를 부여받는다.    
    > compareFunction(a,b)의 리턴 값이 0인 경우 서로에 대해 변경하지 않는다.   

- #### Array.slice()
  - 원본 배열의 얕은 복사본을 반환한다.
  ```js
  let copyArray = array.slice();
  ```