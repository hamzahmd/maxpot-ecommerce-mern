import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from '../reducers/types';

export const ListProducts = ( ) =>async(dispatch) {
  try {
    dispatch({type:PRODUCT_LIST_REQUEST})
    const {data} = await axios.get('/api/products')
    dispatch({type:PRODUCT_LIST_SUCCESS,payload:data})

  } catch (error) {
    dispatch({type:PRODUCT_LIST_FAIL,payload:
    error.response && error.response.data.message?error.message.data.message:error.message
    })
  }
}