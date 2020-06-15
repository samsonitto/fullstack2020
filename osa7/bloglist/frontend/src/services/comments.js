import axios from 'axios'
const baseUrl = '/api/comments'

const comment = async content => {
  const response = await axios.post(baseUrl, content)
  return response.data
}

export default { comment }