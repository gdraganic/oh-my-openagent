/**
 * Prerelease-aware semver comparison for update decisions.
 *
 * `compareVersions` in `shared/opencode-version` strips prerelease suffixes
 * (it exists to gate OpenCode host features), so it cannot order
 * `5.0.0-beta.85` against `5.0.0-beta.89`. Update checks must: beta channel
 * users live entirely on prereleases, and treating "different" as "update"
 * offers a downgrade whenever a local build is newer than the registry tag.
 */
/**
 * Returns -1 when `a` is older than `b`, 0 when equal, 1 when newer.
 * Returns null when either side is not parseable semver — callers must treat
 * null as "cannot tell" and never as "update available".
 */
export declare function compareSemverVersions(a: string, b: string): -1 | 0 | 1 | null;
/** True only when `latestVersion` is strictly newer than `currentVersion`. */
export declare function isStrictlyNewerVersion(currentVersion: string, latestVersion: string): boolean;
