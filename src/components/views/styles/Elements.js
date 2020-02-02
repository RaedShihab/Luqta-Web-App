import styled from 'styled-components'


export const MenuHeader = styled.div`
    position: relative;
    margin-bottom: 4px;
    text-align: center;
`

export const MenuContent = styled.div`
    overflow: hidden;
    padding: 10px;
`

export const MenuItem = styled.div`
    cursor: pointer;
    display: block;
    font-weight: 700;
    padding: 6px 12px;
    position: relative;
    margin: 0 -12px;
    text-decoration: none;

    &:hover {
      background-color: #3179BA;
      color: #fff;
    }
`

export const MenuTitle = styled.span`
    box-sizing: border-box;
    color: #6b808c;
    display: block;
    line-height: 30px;
    border-bottom: 1px solid rgba(9,45,66,.13);
    margin: 0 6px;
    overflow: hidden;
    // padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
`

