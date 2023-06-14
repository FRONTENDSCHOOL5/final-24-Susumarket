import styled from "styled-components";
const Button = styled.button`
    background-color: var(--color-primary); // 변경 예정
    color: #FFFFFF;
    font-family: "Pretendard";
    &.small {
        font-size: 12px;
        font-weight : 400;
        padding: 7px 11px;
        border-radius: 26px;
    };

    &.ms {
        font-size: 14px;
        font-weight: 500;
        padding: 7px 32px;
        border-radius: 32px;
    };

    &.medium {
        font-size: 14px;
        font-weight: 500;
        padding: 8px 40px;
        border-radius: 30px;
    };
    
    &.large {
        font-size: 18px;
        font-weight: 500;
        padding: 13px 148px;
        border-radius: 44px;
    };


    &.small, &.medium{
        background-color: ${(props) => (props.active ? "var( --color-primary )" : "#fff")};
        color: ${(props) => (props.active ? '#fff' : '#767676')};
        box-shadow: ${(props) => (props.active ? 'none' : '0 0 0 1px inset #DBDBDB;')};
    };
    
    &.ms:disabled,
    &.large:disabled, 
    &.medium:disabled { 
        background-color: var(--color-sub);
    };
`

export default Button;