import cl from './ElementWrapper.module.css';

export default function ElementWrapper({
	children,
}: {
	children: React.ReactNode;
}) {
	return <div className={cl.constructorElements}>{children}</div>;
}
