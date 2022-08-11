module.exports = {
  // printWidth: 100, // printWidth default 80 => 100 으로 변경
  tabWidth: 2, // indent 2칸
  useTabs: false, // tab 대신 space로 공백 표시
  semi: true, // 항상 semiconlon 삽입
  singleQuote: true, // "" -> ''
  // quoteProps: "as-needed",  // object key에서 필요한 경우에만 quote 삽입
  jsxSingleQuote: "false", // JSX의 경우 double quote 사용
  trailingComma: 'none', // object의 제일 마지막 property 뒤에 comma
  bracketSpacing: true, // object bracket 사이에 공백 부여 { foo: bar }
  bracketSameLine: false, // tag들 닫는 괄호 속성 다음줄에 삽입
  // arrowParens: 'avoid' // arrow function parameter가 하나일 경우 괄호 생략
  // proseWrap: "preserve", // markdown file은 포맷안함
  // endOfLine: "lf", // 줄바꿈 lf로 표현(Linux, mac 기본 값)
  printWidth: 120,
  jsxBracketSameLine: true,
};
