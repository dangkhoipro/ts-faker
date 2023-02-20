type TResizableComponentProps = {
  children?: React.ReactNode;
  className?: string;
};

export function ResizableComponent({ children, className }: TResizableComponentProps) {
  return (
    <div className={`${className} resize-x overflow-x-hidden overflow-y-hidden h-screen`} draggable>
      {children}
    </div>
  );
}
