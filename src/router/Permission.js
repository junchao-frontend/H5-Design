export default function checkPermission (value) {
  if (value && value instanceof Array && value.length > 0) {
    const permissionRoles = value
    const hasPermission = permissionRoles.some(item => {
      return item === localStorage.getItem('role')
    })
    return hasPermission
  } else {
    console.error(`need roles! Like v-permission="['admin','editor']"`)
    return false
  }
}