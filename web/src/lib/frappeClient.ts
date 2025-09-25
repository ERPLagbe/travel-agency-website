import FrappeClient from 'frappe-react-sdk'

// Create a custom Frappe client with proper CORS configuration
const frappeClient = new FrappeClient({
  url: 'http://localhost:8000',
  useToken: false,
  token: null,
  type: 'token',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

export default frappeClient

