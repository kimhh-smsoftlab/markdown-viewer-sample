# Electron 학습노트

-   ### npm 명령어

    -   ##### npm install 명령어
        | 명령어                             | 내용                                                                                                              |
        | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
        | `npm install`                      | package.json의 dependencies에 있는 모든 패키지를 설치한다.                                                        |
        | `npm i`                            | npm install 의 줄인 명령어                                                                                        |
        | `npm install [package]`            | 현재 작업중인 디렉토리 내에 있는 ./node_modules에 [package]를 설치한다.                                           |
        | `npm install [package] --save`     | [package]를 설치 하면서 package.json파일에 있는 dependencies 객체에 지금 설치한 패키지 정보를 추가한다.           |
        | `npm install [package] --save-dev` | --save옵션과 같이 package.json파일에 의존성 내용을 추가하지만 dependencies가 아닌 devDepenencies 객체에 추가한다. |
        | `npm install [package] -g`         | [package]를 전역에 설치한다.                                                                                      |
        | `npm install [package] --force`    | 해당 패키지가 존재하더라도 원격 저장소에 있는 패키지를 가져온다.                                                  |
        | `npm install [package]@version`    | 특정한 버전의 [package] 를 설치한다.                                                                              |
        | `npm install [package]@latest`    | 최신 버전의 [package] 를 설치한다.                                                                              |
    -   ##### npm uninstall 명령어
        | 명령어                               | 내용                                                |
        | ------------------------------------ | --------------------------------------------------- |
        | `npm uninstall [package]`            | ./node_modules에 있는 [package]를 제거한다.         |
        | `npm uninstall -g [package]`         | 전역에 있는 [package]를 제거한다.                   |
        | `npm uninstall [package] --save, -S` | dependencies 객체에서 [package] 정보를 제거한다.    |
        | `npm uninstall [package] --save-dev` | devDependencies 객체에서 [package] 정보를 제거한다. |

-   ### gitignore 명령어

    | 명령어           | 내용                                                                               |
    | ---------------- | ---------------------------------------------------------------------------------- |
    | `file.txt`       | 'file.txt' 파일을 ignore 처리한다.                                                 |
    | `dir/file.txt`   | 'dir' 디렉토리에 있는 'file.txt' 파일을 ignore 한다                                |
    | `dir/ `          | 'dir' 자체와 디렉토리 내의 모든 내용물들을 ignore 처리한다.                        |
    | `dir `           | 'dir' 이름을 가진 파일, 디렉토리, 해당 디렉토리의 내용물까지 모두 ignore 처리된다. |
    | `[dD]ir/`        | dir/, Dir/ 두가지 경로 모두 ignore 한다.                                           |
    | `*.apk `         | 'apk' 확장자를 갖는 모든 파일들을 ignore 한다.                                     |
    | `dir/*.apk`      | 'dir' 디렉토리 내부의 모든 'apk' 파일을 ignore 한다.                               |
    | `/*.apk`         | 최상위 디렉토리 내부의 'apk'파일을 ignore 한다.                                    |
    | `/dirA/**/dirB/` | 'dirA' 내부 어딘가 존재하는 'dirB'에 대해 ignore 한다.                             |
    | `!file.txt`      | 'file.txt' 파일은 ignore 예외 처리한다.                                            |

    -   예외 처리 시 유의사항

    ```
    //ignore할 폴더에서 특정 파일만 예외하기
    folder/
    !folder/*.txt
    //위의 순서로 예외처리 할 경우 폴더 내의 모든 .txt 파일들이 여전히 ignore 처리된 채 남아있다.

    !folder/
    folder/*
    !folder/*.txt
    //폴더 자체를 예외시키고 해당 폴더의 모든 파일을 ignore 한 뒤 최종적으로 다시 *.txt 파일들을 예외 처리한다.
    ```
