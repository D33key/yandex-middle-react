import cl from './Wrapper.module.css';

interface WrapperProps {
	children: React.ReactNode;
}

function Wrapper({ children }: WrapperProps) {
	return <div className={cl.wrapper}>{children}</div>;
}

export default Wrapper;
