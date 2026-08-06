# Command Palette

The command palette is a keyboard-driven overlay that lets you quickly find and open any service on your dashboard without touching the mouse. It is especially useful once you have many services grouped across several sections.

## Opening the palette

Press <kbd>Ctrl</kbd> + <kbd>K</kbd> on Windows/Linux or <kbd>⌘</kbd> + <kbd>K</kbd> on macOS from anywhere on the dashboard to toggle the palette.

Press <kbd>Esc</kbd> or click anywhere on the dimmed backdrop outside the panel to close it.

## Searching

Start typing to filter the list of services. The search matches, in order of priority:

1. Exact match on the service title
2. Title starting with the query
3. Exact match on a tag name
4. Title containing the query
5. Tag containing the query
6. Group title containing the query
7. Description containing the query

The top 20 results are shown, sorted by relevance.

## Navigating

| Key                              | Action                              |
|----------------------------------|-------------------------------------|
| <kbd>↑</kbd> / <kbd>↓</kbd>      | Move selection up / down            |
| <kbd>Enter</kbd>                 | Open the selected service           |
| <kbd>Esc</kbd>                   | Close the palette                   |
| <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> | Toggle the palette       |

## Web search

Whenever the search input is not empty, a compact row of web search shortcuts is shown at the bottom of the palette:

- Google
- Brave Search
- DuckDuckGo

Selecting one opens the current query on that engine in a new tab and closes the palette. The row is always available so a web search is one click away — even when there are matching local services.

## Widget services

Widget-style services (`ip-api`, `openweathermap`, `date-and-time`) mirror the display of the actual service cards:

| Type              | Title                | Description                | Icon                     |
|-------------------|----------------------|----------------------------|--------------------------|
| `ip-api`          | Detected public IP   | `City, Region`             | Country flag             |
| `openweathermap`  | Current temperature  | `Place, condition`         | OpenWeatherMap condition |
| `date-and-time`   | Current time         | Localized date             | Calendar icon            |

If the widget has not loaded yet, the palette falls back to a friendly type name (e.g. `IP Address`, `Weather`, `Date and Time`) and a default icon. Since these services have no `link`, activating them from the palette is a no-op.

## Link behaviour

Opening a service from the palette respects the same rules as clicking its card:

1. The service-level [`target`](./configuration.md#target) is used if set.
2. Otherwise the global [`behaviour.target`](./configuration.md#target) is used.
3. Otherwise the link opens in a new tab (`_blank`).

## Appearance

The palette uses a *frosted glass* effect: the panel background is a translucent variant of the current theme color combined with `backdrop-blur` and `backdrop-saturate`. This lets the user's dashboard background (solid color, gradient, or image configured via [`background`](./configuration.md#background)) show through the panel while keeping text readable across all themes (`light`, `dark`, `deep`, `sepia`, `bluer`).

## Accessibility

- The palette is rendered as a modal dialog with `role="dialog"` and `aria-modal="true"`.
- The results list uses `role="listbox"` with `aria-selected` on the active option.
- Focus is trapped on the search input while the palette is open and restored on close.

## Configuration

The command palette is enabled by default and has no configuration options. Any service defined under [`services`](./configuration.md#services) automatically appears in the palette.
