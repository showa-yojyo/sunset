---
title: Error handling
---

## Error handling, "try...catch"

* まずは `catch` させる・されたオブジェクトの属性を覚えておく必要がある。
  組み込み例外の主要なものを覚える。
* 例外処理の意義自体は他言語と変わらない。
* 環境依存の global catch 機能。ブラウザーならば `window.onerror()` というのがあるだろう。
* この記事では `finally` 節で例外を送出するケースについて述べられていない。何か欲しい。

## Custom errors, extending Error

* `Error` のコンストラクターは `message` しか受け付けないので、サブクラスで `this.name` を上書きする。
* 本文のクラスを図式化するとこういう感じになる。なお `MyError` は省いた。

  ```mermaid
  classDiagram
      direction TB
  
      Error <|-- ValidationError
      Error <|-- SyntaxError
      ValidationError <|-- PropertyRequiredError
      Error <|-- ReadError
      SyntaxError <--o ReadError : cause
  
      class Error{
          +string message
          +string name
      }
  
      class PropertyRequiredError{
          +string property
      }
  
      class ReadError{
      }
  ```
