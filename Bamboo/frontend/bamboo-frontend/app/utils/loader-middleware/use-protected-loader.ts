import { UserAccountTypes } from '~/types/auth/jwt.types';
import { LoaderFunctionArgs, TypedResponse } from '@remix-run/node';
import { Protected } from '~/utils/loader-middleware/protected';
import { RedirectGlobalHome } from '~/utils/misc/shorthand-redirect';

export function UseProtectedLoader<T>(
  roles: UserAccountTypes[],
  fn: (arg0: LoaderFunctionArgs) => Promise<TypedResponse<T>|null> = async ()=>null,
) {
  return (p: LoaderFunctionArgs) => {

    if(!Protected(p.request, ...roles)){
      return RedirectGlobalHome
    }

    return fn(p)

  }
}