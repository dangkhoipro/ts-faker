type TResizableComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

export function ResizableComponent({ children, className }: TResizableComponentProps) {
  return (
    <div className={`${className} resize-x overflow-x-auto`} draggable>
      {children}
    </div>
  );
}
