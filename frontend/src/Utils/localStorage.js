export const addFavoriteToLocalStorage = (product) => {
  if (!product || !product._id) {
    console.error('Invalid product for localStorage:', product)
    return
  }

  let favorites = JSON.parse(localStorage.getItem('favorites')) || []
  if (!favorites.some((item) => item?._id === product._id)) {
    favorites.push(product)
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }
}

export const removeFavoriteFromLocalStorage = (productId) => {
  if (!productId) {
    console.error(
      'Invalid productId passed to removeFavoriteFromLocalStorage:',
      productId
    )
    return
  }

  const favorites = JSON.parse(localStorage.getItem('favorites')) || []

  if (!Array.isArray(favorites)) {
    console.error('Corrupted favorites data in localStorage:', favorites)
    return
  }

  const updatedFavorites = favorites.filter(
    (product) => product && product._id !== productId
  )

  localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
}

export const getFavoritesFromLocalStorage = () => {
  const favorites = JSON.parse(localStorage.getItem('favorites'))
  return Array.isArray(favorites) ? favorites : []
}
