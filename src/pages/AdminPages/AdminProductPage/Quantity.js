import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components"

import { fontTheme, H2, H4, P, TextBtn } from "../../../constants/style"
import { getProducts, setProducts } from "../../../features/product/productSlice";
import { getProductAPI, updatePatternAPI } from "../../../webAPI/productAPI";


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
            &:nth-child(n+3):nth-child(-n+6){
                width: 10%;
            }

            white-space: nowrap;

            
        }
        & tr {
            vertical-align: top;
            & th {
                // white-space: nowrap;
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


const FilterBtn = styled(TextBtn)`
    padding: 0 10px;
`

const Input = styled.input`
    &:last-child {
        width: 50px;
        padding: 0 5px;
    }
    margin-right: 2px;
    & + label {
        margin-right: 5px;
    }
`

const Form = styled.td`
    & ${Input}:last-child {
        border: ${props => props.$isError && '2px solid red'};
    }
    & + td > span {
        color: ${props => props.$isError && props.theme.color.alert};
    }
`

const Total = styled.td`
    background-color: ${props => props.$safe && props.theme.color.success};
    background-color: ${props => props.$caution && props.theme.color.yellow};
    background-color: ${props => props.$danger && props.theme.color.alert};
`

const SubItem = ({pattern, group}) => {

    const history = useHistory();

    const [type, setType] = useState('')
    const [qty, setQty] = useState(0)

    const [isEditing, setIsEditing] = useState(false)
    const [error, setError] = useState('')

    const handleInputChange = e => {
        switch (e.target.name) {
            case 'type': {
                return setType(e.target.id)
            }
            case 'qty': {
                if(error) setError('')
                return setQty(e.target.value)
            }
            default: break
        }
    }

    const handleIsEditing = e => {
        if(e.target.name === 'edit') return setIsEditing(true)
        if(e.target.name === 'save') {
            if(!type || !parseInt(qty)) {
                setType('')
                setQty(0)
                return setIsEditing(false)
            }
            updatePatternAPI(pattern.id, {
                type, 
                quantity: parseInt(qty)
            }).then(result => {
                if(!result.ok) return setError(result.message)
                alert('????????????????????????!')
                return history.go()
            })
        }
    }

    return (
        <tr>
            <td></td>
            <td></td>
            <td>{pattern[group].size}</td>
            <td>{pattern.Color.name}</td>
            <Total 
                $safe={pattern.total >= 30}
                $caution={pattern.total >= 10 && pattern.total < 30}
                $danger={pattern.total < 10 && typeof pattern.total === 'number'}
            >
                {typeof pattern.total === 'number' ? pattern.total : '-'}
            </Total>
            <Form $isError={error}>
                <Input 
                    checked={type === 'INC'} 
                    onChange={handleInputChange} 
                    type="radio" 
                    name="type" 
                    id="INC" 
                    disabled={!isEditing} 
                />
                <label htmlFor="increase">??????</label>
                <Input 
                    checked={type === 'DEC'} 
                    onChange={handleInputChange} 
                    type="radio" 
                    name="type" 
                    id="DEC" 
                    disabled={!isEditing} 
                />
                <label htmlFor="decrease">??????</label>
                <Input 
                    value={qty} 
                    onChange={handleInputChange} 
                    type="number" 
                    name="qty" 
                    min="0" 
                    disabled={!isEditing} 
                />???
            </Form>
            <td>{isEditing ? (<span>{error}</span>) : pattern.updatedAt}</td>
            <td>
                {isEditing ? (
                    <FilterBtn onClick={handleIsEditing} type="submit" name="save" $white $active>
                        ??????
                    </FilterBtn>
                ) : (
                    <FilterBtn onClick={handleIsEditing} type="button" name="edit" $white $active>
                        ??????
                    </FilterBtn>
                )}
            </td>
            <td>
                <FilterBtn type="button" $white $active>
                    ??????
                </FilterBtn>
            </td>
        </tr>
    )
}

const Item = ({product}) => {

    const [item, setItem] = useState()

    useEffect(() => {
        getProductAPI(product.id)
            .then(result => {
                setItem({group: result.data.product.Category.group.slice(0, -1), patterns: result.data.patterns})
            })
        return () => {
            setItem()
        }
    }, [product.id])

    return (
        <>
            <tr>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            {item && item.patterns.map(pattern => {
                return (
                    <SubItem 
                        key={pattern.id} 
                        pattern={pattern} 
                        group={item.group} 
                    />
                )
            })}
        </>
    )
}

export const Quantity = () => {

    const dispatch = useDispatch()

    const products = useSelector(state => state.product.products)
    const error = useSelector(state => state.product.error)

    useEffect(() => {
        dispatch(getProducts('', ''))
        return () => {
            dispatch(setProducts(null))
        }
    }, [dispatch])

    return (
        <>
            <MainContainer>
                <H2>???????????????????????????</H2>
                <TableContainer>
                    <table>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>????????????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th>??????</th>
                                <th></th>
                                <th>????????????</th>
                                <th></th>
                                <th>????????????</th>
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
        </>
        
    )
}