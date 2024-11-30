import { useEffect, useState } from 'react';
import { TabName } from '../../components/tab/types';

interface UseTabProps {
	root?: React.MutableRefObject<HTMLDivElement | null>;
	threshold?: number | number[];
	rootMargin?: string;
}

export type SectionsRef = Record<TabName, HTMLDivElement | null>;

export const useTab = ({
	root,
	threshold = [],
	rootMargin = '-30px 0px -90% 0px',
}: UseTabProps) => {
	const [sections, setSections] = useState<SectionsRef>({} as SectionsRef);
	const [activeTab, setActiveTab] = useState<TabName>('bun');

	const scrollToTab = (section: TabName) => {
		const targetWrapper = sections?.[section];
		const targetRect = targetWrapper!.getBoundingClientRect();

		root?.current?.scrollTo({
			behavior: 'smooth',
			top:
				root.current.scrollTop +
				(targetRect.top - root.current.getBoundingClientRect().top),
		});

		setActiveTab(section);
	};

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const sectionId = entry.target.getAttribute(
							'data-section',
						) as TabName | null;

						if (sectionId) {
							setActiveTab(sectionId);
						}
					}
				});
			},
			{ root: root?.current, threshold, rootMargin },
		);

		Object.values(sections).forEach((element) => {
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			Object.values(sections).forEach((element) => {
				if (element) {
					observer.unobserve(element);
				}
			});
			observer.disconnect();
		};
	}, [sections, threshold, rootMargin]);

	return [setSections, activeTab, scrollToTab] as const;
};
