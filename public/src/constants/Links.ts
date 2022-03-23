import {IExtendedLinkProps} from '../ts';
import { directories } from './Directories';

export const StartndartLinks: IExtendedLinkProps[] = [{href:'/',displayName:'Home' },
                                            {href:`/${directories.characters}`, displayName:'Characters'},
                                            {href: `/${directories.books}`, displayName:'Books'},
                                            {href: `/${directories.houses}`, displayName:'Houses'}];