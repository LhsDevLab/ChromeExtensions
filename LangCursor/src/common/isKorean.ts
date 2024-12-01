const R = { S: "가".charCodeAt(0), E: "힣".charCodeAt(0) };
const SR = { S: "ㄱ".charCodeAt(0), E: "ㅎ".charCodeAt(0) };
const BR = { S: "ㅏ".charCodeAt(0), E: "ㅣ".charCodeAt(0) };

export const isKorean = (v: string) => {
	if (!v) return false;
	let c = v.charCodeAt(0);
	return (
		(c >= R.S && c <= R.E) ||
		(c >= SR.S && c <= SR.E) ||
		(c >= BR.S && c <= BR.E)
	);
};
