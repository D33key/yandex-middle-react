import cl from './Section.module.css';

type Props = {
	children: React.ReactNode;
};

export default function Section({ children }: Props) {
	return <section className={cl.section}>{children}</section>;
}
