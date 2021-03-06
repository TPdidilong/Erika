import styled from "styled-components"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faPen, faPlus } from '@fortawesome/free-solid-svg-icons'
import { crumbMap } from "../../../constants/mapping";
import { Btn, fontTheme, H2, H4, P, TextBtn } from "../../../constants/style"

import { setPopupCode, setIsOpened } from "../../../features/general/generalSlice";
import { getProducts, setProduct, setProducts } from "../../../features/product/productSlice";

import { getProductAPI } from "../../../webAPI/productAPI";

import { Popup } from "../../../components/Popup";


const MainContainer = styled.main`
    width: 70%;
    flex-grow: 1;
    & h2 {
        padding: 0 10px;
    }
`

const TableContainer = styled.div`
    padding: 10px;
    overflow: auto;
    & table {
        width: 100%;
        min-width: 1000px;
        border: 1px solid #aaa;
        & th, td {
            ${fontTheme.span}
            color: ${props => props.theme.color.black};
            border-top: 1px solid #aaa;
            border-bottom: 1px solid #aaa;
        }
        & tr {
            vertical-align: top;
            & th {
                white-space: nowrap;
                text-align: left;
                padding: 5px 10px;
                background-color: ${props => props.theme.color.lightGrey};
                color: ${props => props.theme.color.white};
                font-weight: ${props => props.theme.fontWeight.xl};
            }
            & td {
                padding: 10px;
            }
        }
    }
`

const ToDetailBtn = styled(TextBtn)`
    padding: 0 10px;
`

const FilterContainer = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    // align-items: center;
    ${fontTheme.p}
    & > div {
        display: flex;
        & > div + div {
            margin-left: 10px;
        }
        & > button {
            margin-right: 10px;
        }
        & a {
            color: ${props => props.theme.color.black};
            & svg {
                margin-right: 2px;
                font-size: ${props => props.theme.fontSize.h4};
            }
        }
    }
`

const Item = ({product}) => {

    const dispatch = useDispatch()
    
    const [info, setInfo] = useState()
    
    useEffect(() => {
        getProductAPI(product.id)
            .then(result => {
                setInfo(result.data)
            })
        return () => {
            setInfo()
        }
    }, [product.id])

    const handleIsOpened = e => {
        dispatch(setProduct(info))
        dispatch(setIsOpened(true))
        dispatch(setPopupCode(e.currentTarget.name))
    }

    return (
        <>
            {info && (
                <tr>
                    <td>{product.id}</td>
                    <td>{product.gender === 'M' ? '??????' : '??????'}</td>
                    <td>{crumbMap[2][info.product.Category.name]}</td>
                    <td>{product.name}</td>
                    <td>{info.product.desc || '-'}</td>
                    <td>{info.product.material || '-'}</td>
                    <td>{info.product.washing || '-'}</td>
                    <td>
                        <ToDetailBtn name="size" onClick={handleIsOpened} $white $active>??????</ToDetailBtn>
                    </td>
                    <td>
                        <ToDetailBtn name="color" onClick={handleIsOpened} $white $active>??????</ToDetailBtn>
                    </td>
                    <td>
                        <Btn name="edit" onClick={handleIsOpened}>
                            <FontAwesomeIcon icon={faPen}/>
                        </Btn>
                    </td>
                    <td>
                        <Btn name="delete" onClick={handleIsOpened}>
                            <FontAwesomeIcon icon={faTrashAlt}/>
                        </Btn>
                    </td>
                </tr>
            )}
        </>
    )
}

export const Information = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.product.products)
    const error = useSelector(state => state.product.error)
    const popupCode = useSelector(state => state.general.popupCode)

    const [gender, setGender] = useState('')
    const [category, setCategory] = useState('')

    useEffect(() => {
        dispatch(getProducts([gender, category], ''))
        return () => {
            dispatch(setProducts(null))
        }
    }, [dispatch, gender, category])

    const handleSelectChange = e => {
        if(e.target.name === 'gender') return setGender(e.target.value)
        if(e.target.name === 'category') return setCategory(e.target.value)
        if(e.target.name === 'clearFilter'){
            setGender('')
            setCategory('')
        }
    }

    return (
        <>
            <MainContainer>
                <H2>???????????????????????????</H2>
                <FilterContainer>
                    <div>
                        <ToDetailBtn name="clearFilter" onClick={handleSelectChange} $white $active>????????????</ToDetailBtn>
                        <div>
                            <label htmlFor="gender">??????: </label>
                            <select name="gender" value={gender} onChange={handleSelectChange} id="gender">
                                <option value="">-----</option>
                                <option value="men">??????</option>
                                <option value="women">??????</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="category">??????: </label>
                            <select name="category" value={category} onChange={handleSelectChange} id="category">
                                <option value="">-----</option>
                                <option value="tops">?????????</option>
                                <option value="shirts">?????????</option>
                                <option value="knit">????????? / ??????</option>
                                <option value="one_piece">?????????</option>
                                <option value="outer">?????????</option>
                                <option value="bottoms">?????????</option>
                                <option value="skirts">?????????</option>
                                <option value="general">?????????</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <Link to="/admin/product/new">
                            <Btn>
                                <FontAwesomeIcon icon={faPlus} />
                            </Btn>
                            <span>????????????</span>
                        </Link>
                    </div>
                </FilterContainer>
                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>????????????</th>
                                <th>????????????</th>
                                <th>????????????</th>
                                <th>??????</th>
                                <th>??????</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products && !error && products.length > 0 && (
                                products.map(product => (
                                    <Item key={product.id} product={product} />
                                ))
                            )}
                        </tbody>
                    </table>
                    {products && !error && products.length === 0 && (
                        <H4>????????????</H4>
                    )}
                    {!products && (
                        error ? (
                            <P>{error}</P>
                        ) : (
                            <H4>???????????????......</H4>
                        )
                    )}
                </TableContainer>
            </MainContainer>
            <>
                {popupCode !== 'color' && popupCode !== 'edit' && popupCode !== 'delete' && (
                    <Popup type="size" />
                )}
                {popupCode !== 'size' && popupCode !== 'edit' && popupCode !== 'delete' && (
                    <Popup type="color" />
                )}
                {popupCode !== 'size' && popupCode !== 'color' && popupCode !== 'delete' && (
                    <Popup type="edit" />
                )}
                {popupCode !== 'size' && popupCode !== 'color' && popupCode !== 'edit' && (
                    <Popup type="delete" />
                )}
            </>
        </>
        
    )
}