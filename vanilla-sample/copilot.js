// get Longest Common Subsequence
// and return the number of characters
// that are the same in both strings
function getLCS(s1, s2) {
  var m = s1.length;
  var n = s2.length;
  var c = new Array(m + 1);
  for (var i = 0; i <= m; i++) {
    c[i] = new Array(n + 1);
  }
  for (var i = 0; i <= m; i++) {
    c[i][0] = 0;
  }
  for (var j = 0; j <= n; j++) {
    c[0][j] = 0;
  }
  for (var i = 1; i <= m; i++) {
    for (var j = 1; j <= n; j++) {
      if (s1.charAt(i - 1) == s2.charAt(j - 1)) {
        c[i][j] = c[i - 1][j - 1] + 1;
      } else {
        c[i][j] = Math.max(c[i - 1][j], c[i][j - 1]);
      }
    }
  }
  return c[m][n];
}
