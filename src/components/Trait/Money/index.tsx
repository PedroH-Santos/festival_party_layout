import NumberFormat from 'react-number-format';

type MoneyProp = {
  value: number | undefined;
}

export function Money({ value }: MoneyProp) {
  return (
    <NumberFormat value={value}
      displayType={'text'}
      thousandSeparator={`.`}
      prefix={'R$ '}
      decimalSeparator={`,`}
      fixedDecimalScale={true}
      decimalScale={2}
    />
  );
}
