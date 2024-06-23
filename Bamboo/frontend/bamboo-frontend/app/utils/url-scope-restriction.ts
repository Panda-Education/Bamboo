/**
 * Function to facilitate the restriction of routes.
 * @param currentPath {string} URL of current view
 * @param allowedScopes {string[]} prefix of paths that are allowed
 * @param callback {()=>void} Callback function that is executed if path reached is not allowed.
 */
export default function UrlScopeRestriction(
  currentPath:string,
  allowedScopes: string[],
  callback:()=>void
){

  if(allowedScopes.filter(a => currentPath.startsWith(a)).length<=0){
    callback()
  }

}