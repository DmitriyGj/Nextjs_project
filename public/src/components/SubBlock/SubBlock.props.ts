export interface ISubBlockContent{
    id: string 
    name: string 
}

export interface ISubBlockBaseProps{
    title: string 
    orientation?: 'horizontal' | 'vertical'
}

export interface ISubBlockProps extends ISubBlockBaseProps {
    content: string [] 
}

export interface ILinkedSubBlockProps extends ISubBlockBaseProps {
    content : ISubBlockContent []
    miniCardTypeEntriy?: 'characters' | 'houses' | 'books'
}