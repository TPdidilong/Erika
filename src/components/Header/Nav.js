import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontTheme, MEDIA_QUERY, Btn, LinkedTag } from '../../constants/style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const MenuNav = styled.nav`
    ${MEDIA_QUERY.main} {
        display: none;
    }
`;

const Menu = styled.ul`
    margin: 0 20px;
    display: flex;

    & > li {
        & > a {
            display: block;
        }
        margin: 0 5px;
        padding: 16px 0;
        position: relative;
        & > div {
            display: none;
            position: absolute;
        }
        &:hover > div {
            display: flex;
        }
    }
`;

const SubMenu = styled.div`
    top: 71px;
    box-shadow: 1px 1px 5px #aaa;
    background-color: #fff;
    & > div {
        margin: 20px 30px;
    }
    & li > a {
        display: block;
    }
`;

const SubMenuListFlex = styled.div`
    width: 240px;
    & ul {
        height: 150px;
        padding: 10px 0;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        flex-wrap: wrap;
    }
`;

const SubMenuListBlock = styled.div`
    width: 180px;
    & ul {
        text-align: center;
        & li {
            display: inline-block;
        }
    }
`;

const MenuLink = styled(LinkedTag)`
    ${fontTheme.h4};
    ${props => (props.$small ? fontTheme.p : 'line-height: 2em')};
    color: ${props => props.theme.color.black};
    padding: 0 10px;

    ${MEDIA_QUERY.main} {
        height: ${props =>
            props.$large
                ? '60px'
                : props.$medium
                ? '50px'
                : props.$small
                ? '40px'
                : '0px'};
        display: table-cell;
        vertical-align: middle;
    }
`;

const SubMenuLink = styled(LinkedTag)`
    ${fontTheme.p}
    color: ${props => props.theme.color.black};
    padding: 5px 5px;
`;

const SubMenuTitle = styled(MenuLink)`
    display: inline-block;
    padding-bottom: 10px;
    font-weight: ${props => props.theme.fontWeight.xl};
    padding: 5px 5px;
    & + ul {
        border-top: 1px solid #ddd;
    }
`;

const MobileMenuNav = styled.nav`
    display: none;
    ${MEDIA_QUERY.main} {
        display: block;
    }
`;

const MobileMenu = styled.ul`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 20;
    width: 75%;
    max-width: 360px;
    height: 100vh;
    padding: 0 10px;
    background-color: ${props => props.theme.color.white};
    box-shadow: 1px 0px 5px ${props => props.theme.color.lightGrey};
    overflow-y: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & li {
        position: relative;
    }

    & > div {
        & > li {
            width: 100%;
            display: block;
            & > ul {
                margin-left: 30px;
                display: none;
                & > li {
                    & > ul {
                        display: none;
                        margin-left: 30px;
                    }
                }
            }
        }
    }
`;

const MobileLink = styled(Link)`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
`;

const ToggleBtn = styled(Btn)`
    width: 60px;
    height: ${props => (props.$size === 'large' ? '60px' : '50px')};
    position: absolute;
    right: 0;
    z-index: 21;
    & label {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    & svg {
        font-size: ${props => props.theme.fontSize.h4};
    }
`;

const ToggleInput = styled.input`
    position: absolute;
    right: 0;
    opacity: 0;
    z-index: -1;
    &:checked ~ ul {
        display: block;
    }
    &:checked + button {
        & svg {
            color: ${props => props.theme.color.grey};
            transform: rotate(0.5turn);
        }
    }
`;

const CheckBox = ({ id, $size }) => {
    return (
        <>
            <ToggleInput id={id} type="checkbox" />
            <ToggleBtn {...{ $size }}>
                <label htmlFor={id}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </label>
            </ToggleBtn>
        </>
    );
};

export const MobileNav = () => {
    return (
        <MobileMenuNav>
            <MobileMenu>
                <div>
                    <li>
                        <MenuLink to="#" $large>
                            ????????????
                        </MenuLink>
                        <MobileLink to="#" />
                    </li>
                    <li>
                        <CheckBox id="collection" $size="large" />
                        <MenuLink to="/collection" $large>
                            ????????????
                        </MenuLink>
                        <MobileLink to="/collection" />
                        <ul>
                            <li>
                                <CheckBox id="collection-men" />
                                <MenuLink to="/collection/men" $medium>
                                    ??????
                                </MenuLink>
                                <MobileLink to="/collection/men" />
                                <ul>
                                    <li>
                                        <MenuLink
                                            to="/collection/men/tops"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/men/tops" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/men/shirts"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/men/shirts" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/men/knit"
                                            $small
                                        >
                                            ????????? / ??????
                                        </MenuLink>
                                        <MobileLink to="/collection/men/knit" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/men/bottoms"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/men/bottoms" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/men/outer"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/men/outer" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/men/general"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/men/general" />
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <CheckBox id="collection-women" />
                                <MenuLink to="/collection/women" $medium>
                                    ??????
                                </MenuLink>
                                <MobileLink to="/collection/women" />
                                <ul>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/tops"
                                            $small
                                        >
                                            ?????? / ??????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/tops" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/knit"
                                            $small
                                        >
                                            ????????? / ??????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/knit" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/bottoms"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/bottoms" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/skirts"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/skirts" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/one_piece"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/one_piece" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/outer"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/outer" />
                                    </li>
                                    <li>
                                        <MenuLink
                                            to="/collection/women/general"
                                            $small
                                        >
                                            ?????????
                                        </MenuLink>
                                        <MobileLink to="/collection/women/general" />
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <CheckBox id="on-sale" $size="large" />
                        <MenuLink to="#" $large>
                            ????????????
                        </MenuLink>
                        <MobileLink to="#" />
                        <ul>
                            <li>
                                <MenuLink to="#" $medium>
                                    ??????????????????_7??????
                                </MenuLink>
                                <MobileLink to="#" />
                            </li>
                            <li>
                                <MenuLink to="#" $medium>
                                    ??????????????????_7??????
                                </MenuLink>
                                <MobileLink to="#" />
                            </li>
                            <li>
                                <MenuLink to="#" $medium>
                                    ??????????????????_3??????
                                </MenuLink>
                                <MobileLink to="#" />
                            </li>
                        </ul>
                    </li>
                    <li>
                        <MenuLink to="#" $large>
                            ????????????
                        </MenuLink>
                        <MobileLink to="#" />
                    </li>
                </div>
                <div>
                    <li>
                        <MenuLink to="#" $large>
                            ??????
                        </MenuLink>
                        <MobileLink to="#" />
                    </li>
                    <li>
                        <MenuLink to="#" $large>
                            ????????????
                        </MenuLink>
                        <MobileLink to="#" />
                    </li>
                </div>
            </MobileMenu>
        </MobileMenuNav>
    );
};

export const Nav = () => {
    return (
        <MenuNav>
            <Menu>
                <li>
                    <MenuLink to="#">????????????</MenuLink>
                </li>
                <li>
                    <MenuLink to="/collection">????????????</MenuLink>
                    <SubMenu>
                        <SubMenuListFlex>
                            <SubMenuTitle to="/collection/men">
                                ??????
                            </SubMenuTitle>
                            <ul>
                                <li>
                                    <SubMenuLink to="/collection/men/tops">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/men/shirts">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/men/knit">
                                        ????????? / ??????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/men/bottoms">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/men/outer">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/men/general">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                            </ul>
                        </SubMenuListFlex>
                        <SubMenuListFlex>
                            <SubMenuTitle to="/collection/women">
                                ??????
                            </SubMenuTitle>
                            <ul>
                                <li>
                                    <SubMenuLink to="/collection/women/tops">
                                        ?????? / ??????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/women/knit">
                                        ????????? / ??????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/women/bottoms">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/women/skirts">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/women/one_piece">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/women/outer">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="/collection/women/general">
                                        ?????????
                                    </SubMenuLink>
                                </li>
                            </ul>
                        </SubMenuListFlex>
                    </SubMenu>
                </li>
                <li>
                    <MenuLink to="#">????????????</MenuLink>
                    <SubMenu>
                        <SubMenuListBlock>
                            <ul>
                                <li>
                                    <SubMenuLink to="#">
                                        ??????????????????_7??????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="#">
                                        ??????????????????_7??????
                                    </SubMenuLink>
                                </li>
                                <li>
                                    <SubMenuLink to="#">
                                        ??????????????????_3??????
                                    </SubMenuLink>
                                </li>
                            </ul>
                        </SubMenuListBlock>
                    </SubMenu>
                </li>
                <li>
                    <MenuLink to="#">????????????</MenuLink>
                </li>
            </Menu>
        </MenuNav>
    );
};
