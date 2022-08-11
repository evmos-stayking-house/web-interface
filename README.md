# Bridge Project
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## 폴더 구조
    .
    ├── public
    ├── src                   
    │   ├── components    # 컴포넌트
    │   │   ├── common    # 재사용 가능성이 있는 컴포넌트
    │   │   ├── feature   # 특정 기능을 포함하는 일회성 컴포넌트
    │   │   └── layout    # 페이지 레이아웃을 구성하는 컴포넌트
    │   ├── hooks         # hooks 모음
    │   ├── pages         # route에 대응되는 componenet (페이지 단위)
    │   └── styles        # 공통 스타일 + pages 스타일      
    └── ...
> 일부 